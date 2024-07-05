<!-- Banner Image, Landing Page Of Computer Vision Site -->
<div align="center">
  <br />
    <a href="">
      <img src="https://firebasestorage.googleapis.com/v0/b/karizmatik-14de4.appspot.com/o/SecretsBanner.png?alt=media&token=805df52f-df80-4fa5-91cd-ca6effe581b3" alt="Project Banner">
    
  <br />

  <div>
    <img src="https://img.shields.io/badge/ejs-yellow?style=for-the-badge&logo=ejs&logoColor=black&color=%23B4CA65" alt="EJS" />
    <img src="https://img.shields.io/badge/node-js?style=for-the-badge&logo=nodedotjs&logoColor=white&label=Node%20JS" alt="Node JS" />
    <img src="https://img.shields.io/badge/mongodb-purple?style=for-the-badge&logo=mongodb&logoColor=white&color=%2347A248" alt="Mongo DB" />
    <img src="https://img.shields.io/badge/express-yellow?style=for-the-badge&logo=express&logoColor=white&color=%23000000" alt="Express JS" />
    <img src="https://img.shields.io/badge/.env-yellow?style=for-the-badge&logo=.env&logoColor=black&color=%23ECD53F
    " alt="Dot env" />
    <img src="https://img.shields.io/badge/passport-yellow?style=for-the-badge&logo=passport&logoColor=black&color=%2334E27A" alt="Passport" />
    <img src="https://img.shields.io/badge/mongoose-yellow?style=for-the-badge&logo=mongoose&logoColor=white&color=%23880000" alt="Mongoose" />
    
  </div>

  <h1 align="center">Secrets</h1>

   <div align="center">
     <h4>Welcome to the Anonymous Secrets Web App! This project allows users to share their secrets anonymously with others. By providing a platform for users to express themselves without revealing their identity, we aim to create a space where people can feel free to share their thoughts, experiences, and confessions without fear of judgment.</h4>
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Links](#links)
7. ⚙️ [Hardware Output](#hardwareoutput)

## 🚨 About

...

## <a name="introduction">🤖 Introduction</a>

...

## <a name="tech-stack">⚙️ Tech Stack</a>

- Node JS - for the server
- Express JS - for the server
- EJS - For templating
- Mongo DB - as the database
- Passport JS - for user Authenication

## <a name="features">🔋 Features</a>

<h3>Software</h3>

👉 **Secrets Screen**:

<img src="https://firebasestorage.googleapis.com/v0/b/karizmatik-14de4.appspot.com/o/MySecretsPage.png?alt=media&token=348e99a1-5a23-441d-a6c3-a483f67ac414" alt="Secrets">

👉 **Create New Secret**:

<img src="https://firebasestorage.googleapis.com/v0/b/karizmatik-14de4.appspot.com/o/CreateNewSecret.png?alt=media&token=860934e2-bb6b-4198-b10a-10277960f30a" alt="New Secret">

👉 **All Secrets View**: View everyones secrets

<img src="https://firebasestorage.googleapis.com/v0/b/karizmatik-14de4.appspot.com/o/AllSecrets.png?alt=media&token=fd08fc26-7c85-4aa8-9001-251e89e88eba" alt="Database">

👉 **Create Account**: Join the platform

<img src="https://firebasestorage.googleapis.com/v0/b/karizmatik-14de4.appspot.com/o/CreateAccount.png?alt=media&token=276f6625-2ff3-4dbf-bb86-17ddc182affa" alt="Create Account">

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/vroymv/Secrets.git
cd Secrets - Starting Code
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
nodemon app.js
```

**Setup Mongo Atlas**

Create Mongo Atlas Account <br>
Copy your connection string<br>

## <a name="snippets">🕸️ Snippets</a>

**Modify the following In your Code**

<details>
<summary><code>app.js</code></summary>
Replace your connection string with process.env.MONGO_URL

```javascript
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
```

</details>

## <a name="links">🔗 Links</a>

Create mongo atlas account here (https://www.mongodb.com/docs/atlas/tutorial/create-atlas-account/)

## <a name="more">🚀 More</a>

**Template source**
The starter code was sourced from Angela Yu's Web Development Bootcamp
