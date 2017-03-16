import clone        from 'clone';
import assign       from 'object-assign';
import { ACTIONS, SECTIONS, } from '../constants/Constants';

const initialState = {
  section: SECTIONS.INTRO,
  requestOpen: false,
  data: {
    zipCode: '00000',
    stateDistrict: 'NA 0',
    reps: [],
    detailRep: {},
    backendResponse: {},
  },
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
  case ACTIONS.ENTERED_ZIP_START:
    return assign({}, state, {
      data: assign({}, state.data, {
        zipCode: action.data,
      }),
      requestOpen: true,
    });
    break;
  case ACTIONS.ENTERED_ZIP_RESPONSE:
    var newSection;
    var dataAssign= {
      backendResponse: action.data,
    }
    if (Object.keys(action.data).length == 0) {
      newSection = SECTIONS.ZIPERROR;
      dataAssign.zipCode = '00000';
    }
    else if (Object.keys(action.data).length == 1) {
      newSection = SECTIONS.REPS;
      for (var key in action.data) {
        dataAssign.reps = action.data[key];
        dataAssign.stateDistrict = key;
      }
    }
    else {
      newSection = SECTIONS.ZIPSELECT;
    }
    return assign({}, state, {
      requestOpen: false,
      section: newSection,
      data: assign({}, state.data, dataAssign),
    });
    break;
  case ACTIONS.ZIP_ERROR:
    return assign({}, state, {
      section: SECTIONS.INTRO,
      data: assign({}, state.data, {
        zipCode: '00000',
      }),
    });
    break;
  case ACTIONS.DISPLAY_SELECTED_REPS:
    var reps = state.data.backendResponse[action.data];
    return assign({}, state, {
      section: SECTIONS.REPS,
      data: assign({}, state.data, {
        stateDistrict: action.data,
        reps: reps,
      }),
    });
    break;
  case ACTIONS.SWITCHED_SECTION:
    return assign({}, state, {
      section: action.data
    });
    break;
  case ACTIONS.DISPLAY_DETAIL_REP:
    return assign({}, state, {
      section: SECTIONS.DETAILREP,
      data: assign({}, state.data, {
        detailRep: action.data,
      }),
    });
    break;
  default:
    return state;
    break;
  }
}
