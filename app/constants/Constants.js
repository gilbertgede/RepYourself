export const ACTIONS = { RESET: 0,
                         ENTERED_ZIP_START: 1,
                         ENTERED_ZIP_RESPONSE: 2,
                         ZIP_ERROR: 3,
                         DISPLAY_SELECTED_REPS: 4,
                         ADDED_CARD: 5,
                         REMOVED_CARD: 6,
                        //  REPLACED_CARD: 7,
                         UPDATED_CARD_MODIFIER: 8,
                         ADDED_USER_ID: 9,
                         ADDED_PARENT_ID: 10,
                       };

export const CARD_TYPES = { ADDREPZIP: 0,
                            REP: 1,
                            LOADING: 2,
                          };

export const CARD_MODIFIERS = {};
CARD_MODIFIERS[CARD_TYPES.ADDREPZIP] = { BASE: 0,
                                         ZIPSELECT: 1,
                                         ZIPERROR: 2,
                                       };
CARD_MODIFIERS[CARD_TYPES.REP] = { BASE: 0,
                                   DETAIL: 1,
                                 };
CARD_MODIFIERS[CARD_TYPES.LOADING] = { BASE: 0,
                                     };

export const CONTACT_TYPES = { CALL: 0,
                               TWEET: 1,
                               FACEBOOK: 2,
                             };
