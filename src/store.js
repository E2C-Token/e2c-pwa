import Vue from "vue";
import Vuex from "vuex";
import * as fb from "./firebase";
import router from "./router";

Vue.use(Vuex);

// realtime firebase

// All Tokens
fb.emissions.onSnapshot((snapshot) => {
  let tokensArray = [];

  snapshot.forEach((doc) => {
    let token = doc.data();
    token.id = doc.id;
    if(token.currentAmount !== 0) {
      tokensArray.push(token);
    }    
  });

  store.commit("setTokens", tokensArray);
});
// Waiting to Liquidate
fb.waitingToLiquidate.onSnapshot((snapshot) => {
  let waitingLiquidationArray = [];

  snapshot.forEach((doc) => {
    let intention = doc.data();
    intention.id = doc.id;

    waitingLiquidationArray.push(intention);
  });

  store.commit("setWaitingToLiquidate", waitingLiquidationArray);
});
// Intentions Liquidation
fb.intentionLiquidation.onSnapshot((snapshot) => {
  let liquidationArray = [];

  snapshot.forEach((doc) => {
    let token = doc.data();
    token.id = doc.id;

    liquidationArray.push(token);
  });

  store.commit("setIntentionsLiquidation", liquidationArray);
});
// All Users
fb.usersCollection.orderBy("name", "desc").onSnapshot((snapshot) => {
  let usersArray = [];

  snapshot.forEach((doc) => {
    let user = doc.data();
    user.id = doc.id;

    usersArray.push(user);
  });

  store.commit("setUsers", usersArray);
});
// All Wishes
fb.allWishes.onSnapshot((snapshot) => {
  let wishesArray = [];

  snapshot.forEach((doc) => {
    let wish = doc.data();
    wish.id = doc.id;

    wishesArray.push(wish);
  });

  store.commit("setAllWishes", wishesArray);
});
// All Avaiable
fb.avaiable.onSnapshot((snapshot) => {
  let avaiableArray = [];

  snapshot.forEach((doc) => {
    let avaiable = doc.data();
    avaiable.id = doc.id;

    avaiableArray.push(avaiable);
  });

  store.commit("setAvaiable", avaiableArray);
});
// Avaiable Active
fb.avaiableActive.onSnapshot((snapshot) => {
  let avaiableActiveArray = [];

  snapshot.forEach((doc) => {
    let avaiableActive = doc.data();
    avaiableActive.id = doc.id;

    avaiableActiveArray.push(avaiableActive);
  });

  store.commit("setAvaiableActive", avaiableActiveArray);
});

// All Liquidations
fb.liquidations.onSnapshot((snapshot) => {
  let liquidationsArray = [];

  snapshot.forEach((doc) => {
    let liquidations = doc.data();
    liquidations.id = doc.id;

    liquidationsArray.push(liquidations);
  });

  store.commit("setliquidations", liquidationsArray);
});

const store = new Vuex.Store({
  state: {
    userProfile: {},
    users: [],
    tokens: [],
    myTokens: [],
    waitingToLiquidate: [],
    allWishes: [],
    avaiable: [],
    avaiableActive: [],
    intentionLiquidation: [],
    liquidations: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val;
    },
    setUsers(state, val) {
      state.users = val;
    },
    setTokens(state, val) {
      state.tokens = val;
    },
    setMyTokens(state, val) {
      state.myTokens = val;
    },
    setWaitingToLiquidate(state, val) {
      state.waitingToLiquidate = val;
    },
    setAllWishes(state, val) {
      state.allWishes = val;
    },
    setAvaiable(state, val) {
      state.avaiable = val;
    },
    setAvaiableActive(state, val) {
      state.avaiableActive = val;
    },
    setIntentionsLiquidation(state, val) {
      state.intentionLiquidation = val;
    },
    setliquidations (state, val) {
      state.liquidations = val;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title,
        uid: user.uid,
      });

      // fetch user profile and set in state
      await dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/painel");
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut();

      // clear user data from state
      commit("setUserProfile", {});

      // redirect to login view
      router.push("/login");
    },    
    async emmitTokens({ state, commit }, payload) {  
      await fb.emissions.add({
        createdAt: new Date(),  
        initialAmount: payload.amount,
        currentAmount: payload.amount,
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        uid: payload.toUid,
        name: payload.toName,
        description: payload.description,
        email: payload.email
      });
      $('#addEmission').modal('hide');
    },
    async setLiquidateIntentionDb({ state, commit }, payload) {
      console.log("payload store", payload);
      await fb.intentionLiquidation.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        emissionId: payload.emissionId,          
        fromName: state.userProfile.name,
        name: payload.toName,
        uid: payload.toUid,
        description: payload.description,
        completed: false
      });
      alert("Um aviso de Intenção de Liquidação será enviado!");
    },
    async liquidateTokens({ state, commit }, payload) {
      // update token amount
      const tokenDoc = payload.tokenId;
      const currentAmount = payload.currentAmount;
      const amount = payload.amount;
      const intentionId = payload.intentionId;
      const total = currentAmount - amount;
      const avaiableSelected = payload.avaiableSelected;
      if(amount != 0 && amount <= currentAmount) {
        await fb.liquidations.add({
          createdAt: new Date(), 
          emissionId: tokenDoc,       
          avaiableSelected: avaiableSelected,
          amount: amount
        })
        await fb.emissions.doc(tokenDoc).update({
          currentAmount: total
        });
        await fb.intentionLiquidation.doc(intentionId).update({
          completed: true
        });
        await fb.avaiable.doc(avaiableSelected).update({
          active: false
        })  
        alert("Liquidação concluída!");
      }else {
        alert("A quantidade a liquidar deve ser menor que a atual")
      }    
    },
    async saveWishAccessDb({ state, commit }, payload) {
      await fb.allWishes.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        title: payload.title,
        description: payload.description,
        completed: false,
      });     
      $('#addwish').modal('hide');
    },
    async saveAvaiableDb({ state, commit }, payload) {
      await fb.avaiable.add({
        createdAt: new Date(),
        fromUid: fb.auth.currentUser.uid,
        fromName: state.userProfile.name,
        title: payload.title,
        description: payload.description,
        mode: payload.mode,
        tags: payload.tags,
        active: true,
      });
      $('#addavaiable').modal('hide');  
    },  
    async fetchUsers({ commit }) {
      await fb.usersCollection.get();
      const users = await fb.usersCollection.get();
      // set users in state
      commit("setUsers", users.data());
    },  
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
        title: user.title,
      });

      dispatch("fetchUserProfile", { uid: userId });
    },
    async loginMetamask() {
      let user = Moralis.User.current(); 
        user = await Moralis.Web3.authenticate();   
      console.log("logged in user:", user);
      // $('#login').modal('hide');
    },
    async logoutMetamask() {
      let user = Moralis.User.current();
      if(user) {
        await Moralis.User.logOut();
      }
      console.log("logged out");
    }
  },
});

export default store;
