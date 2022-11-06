import type { HydratedDocument } from "mongoose";
import type { Group, PopulatedGroup } from "./model";
import { formatDate, FreetResponse } from "../freet/util";
import type { PopulatedFreet } from "../freet/model";
import { User } from "../user/model";
import { UserResponse } from "../user/util";


type GroupResponse = {
  _id: string;
  name: string;
  description: string;
  owner: string;
  moderators: string[];
  members: string[];
  freets: string[];
};


type PopulatedGroupResponse = {
  _id: string;
  name: string;
  description: string;
  owner: UserResponse;
  moderators: UserResponse[];
  members: UserResponse[];
  freets: FreetResponse[];
};


/**
 * Transform a raw Group object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Group>} group - A group object
 * @returns {GroupResponse} - The group object
 */
export const constructGroupResponse = (
  group: HydratedDocument<Group>
): GroupResponse => {
  const groupCopy: Group = {
    ...group.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };

  return {
    ...groupCopy,
    _id: groupCopy._id.toString(),
    members: Array.from(groupCopy.members.values()).map((id) => id.toString()),
    moderators: Array.from(groupCopy.moderators.values()).map((id) =>
      id.toString()
    ),
    owner: groupCopy.owner.toString(),
    freets: Array.from(groupCopy.freets.values()).map((id) => id.toString()),
  };
};


/**
 * Transform a raw Group object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Group>} group - A group object
 * @returns {GroupResponse} - The group object
 */
export const constructPopulatedGroupResponse = (
  group: HydratedDocument<Group>
): PopulatedGroupResponse => {
  const groupCopy: PopulatedGroup = {
    ...group.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };

  return {
    ...groupCopy,
    _id: groupCopy._id.toString(),
    members: groupCopy.members.map((user) => convertUser(user)),
    moderators: groupCopy.moderators.map((user) => convertUser(user)),
    owner: convertUser(groupCopy.owner),
    freets: groupCopy.freets.map((freet) => convertFreet(freet)),
  };
};

const convertUser = (user: User): UserResponse => {
  return {
    _id: user._id.toString(),
    username: user.username,
    dateJoined: formatDate(user.dateJoined)
  }
}
const convertFreet = (freet: PopulatedFreet): FreetResponse => {
  return {
    _id: freet._id.toString(),
    author: freet.authorId.username,
    content: freet.content,
    dateCreated: formatDate(freet.dateCreated),
    dateModified: formatDate(freet.dateModified)
  };
}