import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB
type user = {
  name: string;
  username: string;
  password: string;
  balance?: Decimal;
};

async function createUser(user: user) {
  const newUser = await prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      password: user.password,
      balance: new Decimal(user.balance ?? 0),
    },
  });
  console.log(newUser);
  return newUser;
}

// createUser({
//   name: "doe",
//   username: "testuser1@mail.com",
//   password: "12345678",
// });
// createUser({
//   name: "doe",
//   username: "testuser2@mail.com",
//   password: "12345678",
// });

type Transaction = {
  from: string;
  to: string;
  amount: number;
};

async function createTransactions(transaction: Transaction) {
  try {
    const amount = new Decimal(transaction.amount).toString(); // Convert Decimal to string

    // Create a new transaction
    const newTransaction = await prisma.transactionsTable.create({
      data: {
        from: transaction.from,
        to: transaction.to,
        amount: amount, // Pass as string
      },
    });

    // Fetch the current balance of the user
    const user = await prisma.user.findUnique({
      where: {
        username: transaction.from,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const currentBalance = new Decimal(user.balance);
    const updatedBalance = currentBalance.minus(new Decimal(transaction.amount)); // Use Decimal methods

    // Update the user's balance
    await prisma.user.update({
      where: {
        username: transaction.from,
      },
      data: {
        balance: updatedBalance.toString(), // Convert Decimal to string
      },
    });

    console.log(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
}


createTransactions({
  from: "testuser1@mail.com",
  to: "testuser2@mail.com",
  amount: 500,
});
type ussr = {
  username: string;
};
async function showUser(user: ussr) {
  const userDetails = await prisma.user.findFirst({
    where: {
      username: user.username,
    },
    select: {
      username: true,
      balance: true,
    },
  });
  console.log(userDetails);
}

showUser({ username: "testuser2@mail.com" });
showUser({ username: "testuser1@mail.com" });
