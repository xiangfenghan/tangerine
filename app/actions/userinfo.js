import * as actionTypes from '../constants/userinfo'

export function update(data){
  return {
    type:actionTypes.USERINFO_UPDATE,
    data
  }
}

export function login(data){
  return {
    type:actionTypes.USERINFO_LOGIN,
    data
  }
}