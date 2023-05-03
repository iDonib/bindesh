const UserRole = Object.freeze({
  ADMIN: "admin",
  User: "user",
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

module.exports = { UserRole, BoardType, PostPriority, PostStatus };
