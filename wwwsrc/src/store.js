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
          router.push({
            name: 'home'
          })
        })
        .catch(e => {
          console.log('[registration failed] :', e)
        })
    },
    authenticate({
      commit,
      state
    }) {
      auth.get('authenticate')
        .then(res => {
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
          console.log('Login Failed')
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
      debugger
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

    //#endregion

    //#region Vaults
    getUserVaults({
      commit,
      dispatch,
      state
    }) {
      auth.get('authenticate').then(res => {
        api.get('vault/' + res.data.id).then(responce => {
          commit('setUserVaults', responce.data)
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


    //#endregion

    makeVaultKeep({
      commit,
      dispatch
    }, data) {
      auth.get('authenticate').then(res => {
        data.userId = res.data.id
        api.post('vaultkeep', data).then(response => {
          if (response.data >= 0) {
            console.log(response)
          }
        }).catch(err => {
          console.log('makeVaultKeep error:' + err)
        })

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
    }
  }
})