import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';
import { LocalStorageHelper, StorageKeys } from '../helper/storage-helper';
import { UserInfoType } from '@constant/user-types';

const saveOnlineStorage = (onlineUser: Record<string, any>, num: number) => {
  LocalStorageHelper.setItem(StorageKeys.ONLINE_USER, onlineUser);
  LocalStorageHelper.setItem(StorageKeys.ONLINE_NUM, num);
}
const userSlice = createSlice({
  name: 'user',
  initialState: {
    onlineUser: LocalStorageHelper.getItem(StorageKeys.ONLINE_USER) || {},
    onlineNum: LocalStorageHelper.getItem(StorageKeys.ONLINE_NUM) || 0,
    userInfo: LocalStorageHelper.getItem(StorageKeys.USER_INFO) || {},

    friendNoteNum: 0,
    groupNoteNum: 0,
  },
  reducers: {
    setUserInfo: (state, action:PayloadAction<any>) => ({
      ...state, 
      userInfo: action.payload
    }),
    addUser: (state, action:PayloadAction<any>) => {
      const newOnlineUser = {...state.onlineUser, ...action.payload};
      const newNum = Object.keys(newOnlineUser).length;
      saveOnlineStorage(newOnlineUser, newNum);
      return {  
        ...state, 
        onlineUser: newOnlineUser,
        onlineNum: newNum,
      }
    },
    deleteUser: (state, action:PayloadAction<{username: string}>) => {
      const { payload: { username } } = action;
      const newOnlineUser = omit(state.onlineUser, [username]);
      const newNum = Object.keys(newOnlineUser).length;
      saveOnlineStorage(newOnlineUser, newNum);
      LocalStorageHelper.removeItem(StorageKeys.USER_INFO);
      return {  
        ...state, 
        onlineUser: newOnlineUser,
        onlineNum: newNum,
      }
    },
    setFriendNoteNum: (state, action:PayloadAction<{num: number}>) => {
      const { payload: { num } } = action;
      return {
        ...state,
        friendNoteNum: num
      }
    },
    setGroupNoteNum: (state, action:PayloadAction<{num: number}>) => {
      const { payload: { num } } = action;
      return {
        ...state,
        groupNoteNum: num
      }
    },
    addFriendNoteNum: (state) => {
      return {
        ...state,
        friendNoteNum: state.friendNoteNum + 1
      }
    },
    subFriendNoteNum: (state) => {
      return {
        ...state,
        friendNoteNum: state.friendNoteNum - 1
      }
    },
    subGroupNoteNum: (state) => {
      return {
        ...state,
        groupNoteNum: state.groupNoteNum - 1
      }
    },
  }
})

export const { 
  setUserInfo,
  addUser,
  deleteUser,
  setFriendNoteNum,
  setGroupNoteNum,
  addFriendNoteNum,
  subFriendNoteNum,
  subGroupNoteNum,
} = userSlice.actions;
export const userSelector = (state: any):UserInfoType => state.user.userInfo;
export const friendNoteNumSelector = (state: any) => (state.user.friendNoteNum);
export const groupNoteNumSelector = (state: any) => (state.user.groupNoteNum)
export const onlineInfoSelector = (state: any) => ({
  onlineUser: state.user.onlineUser,
  onlineNum: state.user.onlineNum,
})

export default userSlice.reducer;