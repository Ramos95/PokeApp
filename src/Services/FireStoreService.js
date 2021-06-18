import firestore from '@react-native-firebase/firestore';
import {filterFireStoreUpdateData} from '../utils';

export const createUserDocument = fireBaseUserID => {
  firestore()
    .collection('Users')
    .doc(fireBaseUserID)
    .set({teams: []})
    .then(() => console.log('User added!'));
};

export const updateCurrentTeam = (fireBaseUserID, userTeams) => {
  console.log(filterFireStoreUpdateData(userTeams));
  firestore()
    .collection('Users')
    .doc(fireBaseUserID)
    .update({teams: filterFireStoreUpdateData(userTeams)})
    .then(() => console.log('Team Updated!'));
};

export const getUserCollection = fireBaseUserID => {
  firestore()
    .collection('Users')
    .doc(fireBaseUserID)
    .onSnapshot(documentSnapshot => {
      console.log('User Data:', documentSnapshot.data());
    });
};
