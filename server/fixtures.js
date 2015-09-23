if(!TagsFollowers.findOne()){
  TagsFollowers.insert({tag: 'C++', followers: [] });
  TagsFollowers.insert({tag: 'C#', followers: [] });
  TagsFollowers.insert({tag: 'Java', followers: [] });
  TagsFollowers.insert({tag: 'Meteor', followers: [] });
  TagsFollowers.insert({tag: 'MySQL', followers: [] });
  TagsFollowers.insert({tag: 'Markdown', followers: [] });
  TagsFollowers.insert({tag: 'Rails', followers: [] });
  TagsFollowers.insert({tag: 'C', followers: [] });
  TagsFollowers.insert({tag: 'PHP', followers: [] });
  TagsFollowers.insert({tag: 'Javascript', followers: [] });
  TagsFollowers.insert({tag: 'Python', followers: [] });
  TagsFollowers.insert({tag: 'Ruby', followers: [] });
  TagsFollowers.insert({tag: 'Bash', followers: [] });
  TagsFollowers.insert({tag: 'CSS3', followers: [] });
  TagsFollowers.insert({tag: 'Objective-C', followers: [] });
  TagsFollowers.insert({tag: 'Scala', followers: [] });
  TagsFollowers.insert({tag: 'HTML5', followers: [] });
  TagsFollowers.insert({tag: 'RubyOnRails', followers: [] });
  TagsFollowers.insert({tag: 'programming', followers: [] });
  TagsFollowers.insert({tag: 'Database', followers: [] });
  TagsFollowers.insert({tag: 'Linux', followers: [] });
  TagsFollowers.insert({tag: 'iOS', followers: [] });
  TagsFollowers.insert({tag: 'Android', followers: [] });
  TagsFollowers.insert({tag: 'Web', followers: [] });
  TagsFollowers.insert({tag: 'Oracle', followers: [] });
  TagsFollowers.insert({tag: 'NodeJs', followers: [] });
  TagsFollowers.insert({tag: 'hacking', followers: [] });
  TagsFollowers.insert({tag: 'virus', followers: [] });
  TagsFollowers.insert({tag: 'Bootstrap', followers: [] });
  TagsFollowers.insert({tag: 'mvc', followers: [] });
  TagsFollowers.insert({tag: 'editor', followers: [] });
  TagsFollowers.insert({tag: 'Game', followers: [] });
  TagsFollowers.insert({tag: 'Tutorial', followers: [] });
  TagsFollowers.insert({tag: 'Git', followers: [] });
  TagsFollowers.insert({tag: 'SQL', followers: [] });
  TagsFollowers.insert({tag: 'Mongodb', followers: [] });
  TagsFollowers.insert({tag: 'research', followers: [] });
  TagsFollowers.insert({tag: 'Windows', followers: [] });
  TagsFollowers.insert({tag: 'Mobile', followers: [] });
  TagsFollowers.insert({tag: 'Bash', followers: [] });
  TagsFollowers.insert({tag: '.NET', followers: [] });

}

// // Fixture data
// if (Posts.find().count() === 0) {
//   var now = new Date().getTime();

//   // create two users
//   var tomId = Meteor.users.insert({
//     profile: { name: 'Tom Coleman' }
//   });
//   var tom = Meteor.users.findOne(tomId);
//   var sachaId = Meteor.users.insert({
//     profile: { name: 'Sacha Greif' }
//   });
//   var sacha = Meteor.users.findOne(sachaId);

//   var telescopeId = Posts.insert({
//     title: 'Introducing Telescope',
//     userId: sacha._id,
//     author: sacha.profile.name,
//     url: 'http://sachagreif.com/introducing-telescope/',
//     submitted: new Date(now - 7 * 3600 * 1000),
//     commentsCount: 2,
//     upvoters: [], 
//     votes: 0
//   });

//   Comments.insert({
//     postId: telescopeId,
//     userId: tom._id,
//     author: tom.profile.name,
//     submitted: new Date(now - 5 * 3600 * 1000),
//     body: 'Interesting project Sacha, can I get involved?'
//   });

//   Comments.insert({
//     postId: telescopeId,
//     userId: sacha._id,
//     author: sacha.profile.name,
//     submitted: new Date(now - 3 * 3600 * 1000),
//     body: 'You sure can Tom!'
//   });

//   Posts.insert({
//     title: 'Meteor',
//     userId: tom._id,
//     author: tom.profile.name,
//     url: 'http://meteor.com',
//     submitted: new Date(now - 10 * 3600 * 1000),
//     commentsCount: 0,
//     upvoters: [], 
//     votes: 0
//   });

//   Posts.insert({
//     title: 'The Meteor Book',
//     userId: tom._id,
//     author: tom.profile.name,
//     url: 'http://themeteorbook.com',
//     submitted: new Date(now - 12 * 3600 * 1000),
//     commentsCount: 0,
//     upvoters: [], 
//     votes: 0
//   });

//   for (var i = 0; i < 10; i++) {
//     Posts.insert({
//       title: 'Test post #' + i,
//       author: sacha.profile.name,
//       userId: sacha._id,
//       url: 'http://google.com/?q=test-' + i,
//       submitted: new Date(now - i * 3600 * 1000 + 1),
//       commentsCount: 0,
//       upvoters: [], 
//       votes: 0
//     });
//   }
// }