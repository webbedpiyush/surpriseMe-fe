# RandomSite

## Project Description

RandomSite is a web application that allows users to visit random websites, providing an exciting way to discover new content on the internet. Built with React and Next.js, it features an interactive canvas animation and a user-friendly interface.

## Features

- Random website generator
- Interactive canvas animation with floating website names
- Warning modal for user discretion
- Responsive design for different screen sizes

## Technologies Used

- React
- Next.js
- Framer Motion (for animations)
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/webbedpiyush/surpriseMe-fe.git
   ```

2. Navigate to the project directory:
   ```
   cd surpriseMe-fe
   ```

3. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

4. Start the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:3000`

## Usage

1. Click the "Visit a random website" button
2. Watch the searching animation
3. When a random website is selected, click the "Visit [website name]" button
4. Read the warning modal and choose to "Continue" or "Cancel"

## CSV File for URLs

This project uses a generated CSV file (`output.csv`) to provide URLs for the random website selection. If you want to generate new URLs or customize the list, you can use the URL generation script available in this repository:

[URL Generation Script Repository](https://github.com/webbedpiyush/surpriseMe-be)

Follow the instructions in the repository to generate a new `output.csv` file, then replace the existing file in this project's public directory, or you can use cron jobs to update the file automatically.

## Contributing

If you'd like to contribute to this project, please submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contact

If you have any questions or suggestions, please create an issue on GitHub or contact me directly.

---

Happy exploring with RandomSite! 🚀
