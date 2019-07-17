import APIUtil from "./api_util";
import FollowToggle from "./follow_toggle";

export default class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $("#username");
    this.$ul = this.$el.find(".users");
    this.handleInput()
  }
  renderResults(results) {
    this.$ul.empty();
    results.forEach(user => {
        const userLi = $('<li>');
        const userLink = $('<a>');
        userLink.attr("href", `/users/${user.id}`);
        userLink.text(user.username);
        userLi.append(userLink);
        const followButtown = $('<button>');
        followButtown.addClass('follow-toggle');
        new FollowToggle(followButtown, {
          'userId': user.id,
          'followState': (user.followed ? 'followed' : 'unfollowed')
        });
        userLi.append(followButtown);
        this.$ul.append(userLi);
    });
  }
  
  handleInput() {
    const sucCB = (resp) => {
      this.renderResults(resp)
    };
    this.$input.on('change keyup', (e) => {
      APIUtil.searchUsers(this.$input.val(), sucCB)
    });
  }

}