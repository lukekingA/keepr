import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let baseUrl = location.host.includes('localhost') ? '//localhost:5000/' : '/'

let auth = Axios.create({
  baseURL: baseUrl + "account/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    lastUrl: '',
    pubKeeps: [],
    userKeeps: [],
    vaults: [],
    curKeepsByVault: [],
    formselect: true,
    loginValid: true,
    registrationValid: true

  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setLastUrl(state, url) {
      state.lastUrl = url
    },
    setPublicKeeps(state, data) {
      state.pubKeeps = data
    },
    setUserKeeps(state, data) {
      state.userKeeps = data
    },
    setUserVaults(state, data) {
      state.vaults = data
    },
    setCurKeepsByVault(state, data) {
      state.curKeepsByVault = data
    },
    setFormSelect(state, data) {
      state.formselect = data
    },
    setLoginValid(state, bool) {
      state.loginValid = bool
    },
    setRegistraionValid(state, bool) {
      state.registrationValid = bool
    }

  },
  actions: {

    //#region Auth
    register({
      commit,
      dispatch
    }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          let vaultData = {
            name: 'General',
            description: 'uncatagorized keeps go here',
            userId: res.data.id
          }
          commit('setRegistraionValid', true)
          dispatch('makeVault', vaultData)
          router.push({
            name: 'home'
          })
        })
        .catch(e => {
          commit('setRegistraionValid', false)
          console.log('[registration failed] :', e)
        })
    },
    authenticate({
      commit,
      state
    }) {
      auth.get('authenticate')
        .then(res => {
          commit('setLoginValid', true)
          commit('setUser', res.data)
          if (!state.user.id) {
            router.push({
              name: 'login'
            })
          }
        })
        .catch(e => {

          console.log('not authenticated')
        })
    },
    login({
      commit,
      dispatch,
      state
    }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setLoginValid', true)
          commit('setUser', res.data)
          if (state.lastUrl) {
            router.push({
              name: state.lastUrl
            })
          } else {
            router.push({
              name: 'front'
            })
          }
        })
        .catch(e => {
          commit('setLoginValid', false)
          console.log('Login Failed')
          router.push({
            name: 'login'
          })
        })
    },
    logout({
      commit,
      dispatch
    }) {
      auth.delete('logout').then(res => {
          console.log(res);
          commit('setUser', {})
          router.push({
            name: 'front'
          })
        })
        .catch(e => {
          console.log('Logout Failed')
        })
    },
    //#endregion

    setLastUrl({
      commit
    }, url) {
      commit('setLastUrl', url)
    },
    setFormSelect({
      commit
    }, data) {
      commit('setFormSelect', data)
    },
    setRegistraionValid({
      commit
    }, bool) {
      commit('setRegistraionValid', bool)
    },
    setLoginValid({
      commit
    }, bool) {
      commit('setLoginValid', bool)
    },
    //#region Keeps
    getPublicKeeps({
      commit,
      dispatch
    }) {
      api.get('keeps').then(res => {
        commit('setPublicKeeps', res.data)
      }).catch(err => {
        console.log('getPublicKeeps error:' + err)
      })
    },
    getUserKeeps({
      commit,
      dispatch
    }) {
      auth.get('authenticate').then(res => {
        api.get('keeps/' + res.data.id).then(responce => {
          commit('setUserKeeps', responce.data)
        }).catch(err => {
          console.log('getUserKeeps error:' + err)
        })

      })
    },
    makeKeep({
      commit,
      dispatch,
      state
    }, data) {
      data.keep.userId = state.user.id
      api.post('keeps', data.keep).then(res => {
        dispatch('getPublicKeeps')
        dispatch('getUserKeeps')
        let vkData = {
          vaultId: data.vaultId,
          keepId: res.data
        }
        dispatch('makeVaultKeep', vkData)
      }).catch(err => {
        console.log('makeKeep error:' + err)
      })
    },

    editKeep({
      commit,
      dispatch
    }, keep) {
      api.put('keeps', keep).then(() => {
        dispatch('getUserKeeps')
      })
    },
    deleteKeep({
      commit,
      dispatch
    }, id) {
      api.delete('keeps/' + id).then(res => {
        if (res.status != 200) {
          console.log('Problem with keep delete')
        }
        //dispatch('getUserKeeps')
      }).catch(err => {
        console.log('deleteKeep error:' + err)
      })
      dispatch('getUserKeeps')
    },

    //#endregion

    //#region Vaults
    getUserVaults({
      commit,
      dispatch,
      state
    }) {
      auth.get('authenticate').then(res => {
        api.get('vault/' + res.data.id).then(response => {
          commit('setUserVaults', response.data)
        }).catch(err => {
          console.log('getUserVaults error:' + err)
        })
      })
    },
    makeVault({
      commit,
      dispatch,
      state
    }, data) {
      data.userId = state.user.id
      api.post('vault', data).then(res => {
        if (res.data >= 0) {
          dispatch('getUserVaults')
        }
      })
    },
    deleteVault({
      commit,
      dispatch
    }, vault) {
      if (vault.name.toLowerCase() == "general") {
        console.log('Cannot delete General vault')
        return
      }
      api.delete('vault/' + vault.id).then(res => {
        if (res.status != 200) {
          console.log('Problem with vault delete')
        }
        dispatch('getUserVaults')
      }).catch(err => {
        console.log('deleteVault error:' + err)
      })
    },


    //#endregion

    makeVaultKeep({
      commit,
      dispatch,
      state
    }, data) {
      auth.get('authenticate').then(res => {
        // let gkvData = {
        //   vaultId: data.vaultId,
        //   user: state.user.id
        // }
        api.get('vaultkeep/vault/' + data.vaultId + '/usr/' + res.data.id).then(response => {
          let vkIds = response.data.map(v => v.id)
          if (!vkIds.includes(data.keepId)) {
            data.userId = res.data.id
            api.post('vaultkeep', data).then(response => {
              if (response.data >= 0) {
                console.log(response)
              }
            }).catch(err => {
              console.log('makeVaultKeep error:' + err)
            })
          } else {
            console.log('Keep already in vault')
            return
          }
        })
        //dispatch('getKeepsByVault', gkvData)


      })
    },

    getKeepsByVault({
      commit,
      dispatch
    }, data) {
      api.get('vaultkeep/vault/' + data.vaultId + '/usr/' + data.user).then(res => {
        commit('setCurKeepsByVault', res.data)
      }).catch(err => {
        console.log('getKeepsByVault error:' + err)
      })
    },

    removeVaultKeep({
      commit,
      dispatch
    }, data) {
      debugger
      api.delete('vaultkeep/vault/' + data.vaultId + '/keep/' + data.keepId).then(res => {
        if (res.data >= 0) {
          let mVKData = {
            vaultId: data.generalVaultId,
            keepId: data.keepId,
            userId: data.userId
          }
          dispatch('makeVaultKeep', mVKData)
        }
        let kByVData = {
          vaultId: data.vaultId,
          user: data.userId
        }
        dispatch('getKeepsByVault', kByVData)
      })
    }
  }
})