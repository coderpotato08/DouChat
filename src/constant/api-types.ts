import { FriendApplyStatusEnum } from '@constant/friend-types';
export const socketHost = "http://localhost:3040" // 聊天室socket
export const meetingSocketHost = "http://localhost:3050"  // 视频会议socket

export enum ApiEnum {
  LOGIN = "/user/login", // 登陆
  SEARCH_USERS = "/user/search", // 模糊查询用户
  LOAD_USER_INFO = "/user/loadUserInfo", // 加载用户信息
  ADD_FRIEND = "/user/add-friend", // 添加用户
  FRIEND_NOTIFICATION = "/user/friend/notification",  // 好友通知
  FRIEND_LIST = "/user/friend/list", // 好友列表
  CHANGE_FRIEND_STATUS = "/user/friend/changeStatus",  // 同意/拒绝 好友申请
  CREATE_MEETING = "/meeting/create", // 创建会议
  LOAD_MEETING_INFO = "/meeting/getInfo", // 获取会议信息
  LOAD_USER_CONTACT_LIST = '/contacts/user-contact-list',  // 聊天栏用户列表
  LOAD_USER_CONTACT = '/contacts/loadUserContact', // 加载某个聊天关系
  LOAD_USER_MESSAGE_LIST = '/message/user-list', // 用户-消息记录
  UPLOAD_IMAGE = '/upload/image', // 上传图片
  CREATE_GROUP = '/group/create', // 创建群聊
  LOAD_GROUP_LIST = '/group/loadGroupList', // 加载群聊
  LOAD_GROUP_USERS = '/group/loadGroupUsers', // 加载群用户列表
}

export interface UserContactsParamsType {
  userId: string
}

export interface UserMsgListParamsType {
  fromId: string
  toId: string
}
export interface CreateMeetingParamsType {
  creator: any,
  meetingName: string,
  userList: Array<string>,
  isJoinedMuted: boolean,
  createTime: Date,
}

export interface LoadMeetingInfoParamsType {
  meetingId: string
}

export interface SearchUserParamsType {
  keyWord: string,
  currUserId: string
}

export interface AddFriendParamsType {
  userId: string,
  friendId: string,
}

export interface ChangeFriendStatusParamsType {
  id: string,
  changeStatus: FriendApplyStatusEnum,
}

export interface LoadUserContactParamsType {
  contactId: string,
}

export interface CreateGroupParamsType {
  users: string[],
  creator: string,
  groupName: string,
  groupNumber: number,
  sign?: string,
}

export interface LoadGroupUsersParamsType {
  groupId: string,
}

export interface LoadUserInfoParamsType extends UserContactsParamsType {}
export interface LoadFriendListParamsType extends UserContactsParamsType {}
export interface LoadFriendNotificationsParamsType extends UserContactsParamsType {}
export interface LoadGroupListParamsType extends UserContactsParamsType {}