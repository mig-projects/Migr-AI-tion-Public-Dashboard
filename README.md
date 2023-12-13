<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./src/assets/images/logo.svg" alt="Project logo"></a>
</p>

---

<p align="center"> Participant Dashboard for FIND HR Project
    <br>
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
This project is a web app that allows users to speak about their discriminatory experiences.

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install the software and how to install them.

```
NodeJS
Your Preffered IDE
```

### Installing

1. Clone the project.
2. Open the project directory.

## 🎈 Usage <a name="usage"></a>

### Backend Configuration

We are using Supabase as our backend and firebase is being used for Cloud Functions. In order to connect your own backends, you need to make some changes in the code.

#### Supabase:
Create a `config.json` file in the ```src/features/supabase/``` directory and add the following variables there.

```
{
  "url": "",
  "key": ""
}
```

#### Firebase:
Create a `config.json` file in the ```src/features/firebase/``` directory and copy your firebase config there.

```
{
  "apiKey": "",
  "authDomain": "",
  "projectId": "",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": ""
}
```

### Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies required for the project to run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## ⛏️ Built Using <a name = "built_using"></a>
- [ReactJS](https://react.dev/) - Framework
- [ViteJS](https://vitejs.dev/) - Build Tool
- [Supabase](https://supabase.com/) - Backend

## ✍️ Authors <a name = "authors"></a>
- [@awais-amjed](https://github.com/awais-amjed) - Full Stack Developer

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- [Migr-AI-tion](https://www.migr-ai-tion.com/)
