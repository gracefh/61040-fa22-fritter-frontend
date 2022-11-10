import Vue from 'vue';
import VueRouter from 'vue-router';
import FreetsPage from './components/Freet/FreetsPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import AllGroupsPage from './components/Groups/AllGroupsPage.vue';
import GroupPage from './components/Group/GroupPage.vue';
import NotFound from './NotFound.vue';


Vue.use(VueRouter);

const groupProps = function (route) {
  return route.params;
}


const routes = [
  { path: '/', name: 'Home', component: FreetsPage },
  { path: '/account', name: 'Account', component: AccountPage },
  { path: '/groups', name: 'Groups', component: AllGroupsPage },
  { path: '/groups/:groupId', name: 'Group', component: GroupPage, props: groupProps },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '*', name: 'Not Found', component: NotFound }
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({ name: 'Account' }); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === 'Account' && !router.app.$store.state.username) {
      next({ name: 'Login' }); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
