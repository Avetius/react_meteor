
export const getSelector = ({ icoStatus, ...args }) => {
  const icoStatusSelectorMap = {
    ongoing: ongoingSelector,
    upcoming: upcomingSelector,
    finished: finishedSelector,
    suspicious: suspiciousSelector,
    scam: scamSelector
  };
  return icoStatusSelectorMap[icoStatus](args);
};

// todo: solve problem when some publish new ICO during scrolling - ie. updatedAt field will change - not createdAt
const ongoingSelector = ({entityState, timestampToBound}) => {
  const currentDate = new Date();
  const selector = {
    'meta.dataStatus':'production', 'entityState.state': entityState,
    icoStartDatetime : { $lt : currentDate }, icoEndDatetime: { $gte : currentDate },
    ratingScore: { $nin: [ 'suspicious', 'scam' ] }
  };
  let createdAtField;
  if (timestampToBound) {
    createdAtField = { createdAt: { $lte: timestampToBound } };
  }
  return {
    ...selector,
    ...createdAtField
  };
};

const upcomingSelector = ({entityState, timestampToBound}) => {
  const currentDate = new Date();
  const selector = {
    'meta.dataStatus':'production', 'entityState.state': entityState,
    // we consider icos with empty dates as upcoming
    $or: [ { icoStartDatetime: { $gt : currentDate }}, { icoStartDatetime: null }, { icoEndDatetime: null } ],
    ratingScore: { $nin: [ 'suspicious', 'scam' ] }
  };
  let createdAtField;
  if (timestampToBound) {
    createdAtField = { createdAt: { $lte: timestampToBound } };
  }
  return {
    ...selector,
    ...createdAtField
  };
};

const finishedSelector = ({entityState, timestampToBound}) => {
  const currentDate = new Date();
  const selector = {
    'meta.dataStatus':'production', 'entityState.state': entityState,
    icoStartDatetime : { $lt : currentDate }, icoEndDatetime: { $lt : currentDate },
    ratingScore: { $nin: [ 'suspicious', 'scam' ] }
  };
  let createdAtField;
  if (timestampToBound) {
    createdAtField = { createdAt: { $lte: timestampToBound } };
  }
  return {
    ...selector,
    ...createdAtField
  };
};

const suspiciousSelector = ({entityState, timestampToBound}) => {
  const selector = {
    'meta.dataStatus':'production', 'entityState.state': entityState,
    ratingScore: 'suspicious'
  };
  let createdAtField;
  if (timestampToBound) {
    createdAtField = { createdAt: { $lte: timestampToBound } };
  }
  return {
    ...selector,
    ...createdAtField
  };
};

const scamSelector = ({entityState, timestampToBound}) => {
  const selector = {
    'meta.dataStatus':'production', 'entityState.state': entityState,
    ratingScore: 'scam'
  };
  let createdAtField;
  if (timestampToBound) {
    createdAtField = { createdAt: { $lte: timestampToBound } };
  }
  return {
    ...selector,
    ...createdAtField
  };
};

export const getSort = ({icoStatus}) => {
  const icoStatusSortMap = {
    ongoing: { icoEndDatetime: 1, projectName: 1 },
    upcoming: { icoStartDatetime: 1, projectName: 1 },
    finished: { icoEndDatetime: -1, projectName: 1 },
    suspicious: { icoStartDatetime: 1, projectName: 1 },
    scam: { icoStartDatetime: 1, projectName: 1 }
  };
  return icoStatusSortMap[icoStatus];
};

export const inIcoListUsableFields = {
  _id: 1,
  projectName: 1,
  abbreviation: 1,
  oneSentenceExplanation: 1,
  icoProjectLogo: 1,

  icoStartDatetime: 1,
  icoEndDatetime: 1,

  icoEndDatetimeFormat: 1,
  icoStartDatetimeFormat: 1,

  icoEvents: 1,
  fundKeeper: 1,
  projectStatus: 1,
  icoWebsiteLink: 1,
  ratingScore: 1,

  // for client side filtering
  entityState: 1,
  // slug url token
  slugUrlToken: 1
};

export const isRestrictPropertyRequested = (query) => {
  return query.entityState !== 'published';
};
