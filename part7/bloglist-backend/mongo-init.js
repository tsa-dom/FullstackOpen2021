/* eslint-disable no-undef */
db.createUser({
  user: 'root',
  pwd: 'secret',
  roles: [
    {
      role: 'dbOwner',
      db: 'blog_db',
    },
  ],
})

db.createCollection('blogs')