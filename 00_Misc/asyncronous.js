/*

    JS - Singlethreaded (runs on main thread)
    examples of async:
    Over a network
    Buffers, ex: Email (SMTP)
    Database
    CRON jobs (in Node)
    File system (files, folders)
    User inputs (mouse, keyboard, event handlers)

    Asynchronous code:

    Solution 1: Callbacks
    Cons: Callback hell

    Solution 2: Promises
      States:
     - Pending
     - Fulfilled
      -Resolved
      -Rejected
    Cons: More chars, nesting lead to doom, less readable

    Soltion 3: Async/Await
    Syntactic Sugar

*/

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     try{
//       resolve("Promise worked out")
//     }catch{
//       reject("Did not work out")
//     }
//   }, 3000)
// }).then((succesMessage) => console.log(succesMessage))
// .catch((errorMessage) => console.log(errorMessage))

/*
Task: Create a promisified function
that is, a functiion that returns a promise
It should be called myPromise
*/

function myPromise() {
  return 
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
          resolve("Something good")
        }catch{
          reject("Something bad")
        }
      }, 2000)
    })
}

/* 
Task:
Create a myFetch function that takes a certain amount of time
It should return some response
*/

// const result = await myPromise()
