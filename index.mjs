import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

// Define the commit range (December 1, 2024, to December 31, 2024)
const startDate = moment("2024-12-01");
const endDate = moment("2024-12-31");

// Generate 100 commit dates randomly within December
const commitDates = Array.from({ length: 100 }, () =>
  moment(startDate)
    .add(Math.random() * endDate.diff(startDate, "days"), "days") // Random day in December
    .toISOString()
);

async function makeCommits() {
  for (const date of commitDates) {
    const data = { date };

    // Write the new date to the JSON file
    await jsonfile.writeFile(path, data);

    // Commit with the historical timestamp
    await git.add(path);
    await git.commit(`Commit on ${date}`, { "--date": date });

    console.log(`✅ Committed on ${date}`);
  }

  // Push all commits to GitHub
  await git.push("origin", "main");
  console.log("🚀 100 Contributions Added for December 2024!");
}

// Run the commit automation
makeCommits().catch(console.error);
