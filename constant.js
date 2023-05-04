const UserRole = Object.freeze({
  ADMIN: "admin",
  USER: "user",
});

const BoardType = Object.freeze({
  FEEDBACK: "feedback",
  FEATUREREQUEST: "featureRequest",
  BUGREPORT: "bugReport",
});

const PostPriority = Object.freeze({
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
});

const PostStatus = Object.freeze({
  OPEN: "open",
  INPROGRESS: "inProgress",
  DONE: "done",
});

const OrgUserRole = Object.freeze({
  ADMIN: "admin",
  USER: "member",
});

module.exports = { UserRole, BoardType, PostPriority, PostStatus, OrgUserRole };
