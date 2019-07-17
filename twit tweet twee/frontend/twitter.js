import FollowToggle from './follow_toggle.js'
import UsersSearch from './users_search.js';

$(() => {
  $("button.follow-toggle").each((idx, el) => {
    new FollowToggle(el);
  });

  $("nav.users-search").each((idx, el) => {
    new UsersSearch(el);
  });
})