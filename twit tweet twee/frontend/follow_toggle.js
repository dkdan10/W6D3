import APIUtil from "./api_util";

export default class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = this.$el.data("initial-follow-state") || options.followState;
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render () {
    if (this.followState === 'followed') this.$el.html('Unfollow');
    else this.$el.html('Follow');
  }


  handleClick(event) {
    event.preventDefault();
    $(event.target).prop('disabled', true)
    const erCB = (e) => {console.log(e); $(event.target).prop('disabled', false);}
    const sucCB = () => {
      this.followState = (this.followState === 'unfollowed' ? 'followed' : 'unfollowed');
      this.render();
      $(event.target).prop('disabled', false)
    }
    if (this.followState === 'unfollowed') {
      APIUtil.followUser(this.userId)
        .then(sucCB)
        .fail(erCB);
    } else {
      APIUtil.unfollowUser(this.userId)
        .then(sucCB)
        .fail(erCB);
    }
  }
}