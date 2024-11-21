## How to Run the App

Follow these steps to run the application on your local machine:

### Prerequisites

Before running the app, ensure you have the following software installed:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **npm**: This is included with Node.js, but you can update it using `npm install -g npm`.

### Steps to Run

1. **Clone the Repository**

   First, clone the repository to your local machine using Git:

   ```bash
   git clone git@github.com:shivamangina/ada-box.git
   cd ada-box
   cd server
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the necessary dependencies:

   ```bash
   npm install
   ```

   This command will read the `package.json` file and install all the required packages.

3. **Start the Development Server**

   To start the application in development mode, run:

   ```bash
   npm start
   ```

   This will start the development server , 

4. **Build for Production**

   If you want to create a production build of the application, use:

   ```bash
   npm run build
   ```

   This will create an optimized build of the app in the `build` directory, which you can deploy to a production server.

### Troubleshooting

- If you encounter any issues during installation or running the app, ensure that your Node.js and npm versions are up to date.
