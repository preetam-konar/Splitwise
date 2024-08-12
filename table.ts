import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
type user = {
  name: string;
  email: string;
  password: string;


};

async function createUser(user:user){
  const newUser = await prisma.user.create({
    data:{
      name:user.name,
      email:user.email,
      password:user.password
    }
  })
  console.log(newUser);
}


// createUser({
//   name:"testuser",
//   email:"testuser3@gmail.com",
//   password:"12345678"
// })

type Friend = {
  userId: string,
  friendId: string
}

async function addFriend(Friend:Friend){

const updateFriend = await prisma.user.update({
  where:{
   id:Friend.userId,

  },
  data:{
    friends:{
      connect:{id:Friend.friendId}
    }

  }
})
const updateFriend2 = await prisma.user.update({
  where:{
   id:Friend.friendId,

  },
  data:{
    friends:{
      connect:{id:Friend.userId}
    }

  }
})

console.log(updateFriend);
console.log(updateFriend2);
}

addFriend({
  userId:"10fc62b8-21e3-4f63-823d-cb597c1545922",
  friendId:"f85acdb2-8ac7-44f0-bc8d-9a305600014e"
})

async function getUserFriends(userId: string) {
  try {
    const userWithFriends = await prisma.user.findUnique({
      where: { id: userId },
      include: { friends: true } // Include the friends relationship
    });

    if (!userWithFriends) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    console.log(`Friends of user ${userId}:`, userWithFriends.friends);
    return userWithFriends.friends;
  } catch (error) {
    console.error('Error retrieving user friends:', error);
  }
}

// Example usage
getUserFriends("9cc87283-31e4-472d-9c8e-f694e815a049");

// async function showUser(user: user) {
//   const newUser = await prisma.user.findFirst({
//     where:{
//         username:user.
//     }
//   });
//   console.log(newUser);
//   return newUser;
// }

// showUser({
//   name: "doe",
//   username: "testuser2@mail.com",
//   password: "12345678",
//   balance: 10
// });
