const owners = ['Mandy', 'Jackson Edison', 'Eddie Cantrip', 'Johnny', 'Alex', 'Fuzeless', 'AnotherFuzeless'];
const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

const initialCount = db.issues.count();

for (let i = 0; i <= 200; i++) {
  const id = initialCount + i + 1;
  const title = `Lorem ipsum dolor sit amet consectetur adipisicing elit, ${id}`;
  const randomCreatedDate = (new Date()) - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const created = new Date(randomCreatedDate);
  const randomDueDate = (new Date()) - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const due = new Date(randomDueDate);
  const effort = Math.ceil(Math.random() * 20);
  const owner = owners[Math.floor(Math.random() * owners.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic distinctio earum iusto facilis explicabo odio veritatis perferendis illum quo, similique beatae eos eveniet tenetur sed quae ullam omnis ducimus nihil harum ut! Odio error recusandae corrupti nemo, repellat itaque! Quam labore assumenda dolorum dignissimos nobis libero magnam, dolor sapiente sed saepe et voluptatum nemo excepturi nesciunt, perferendis aliquid quod? Ullam, ex perferendis eum, incidunt, neque ducimus rem fugiat maxime voluptatum a unde labore optio officiis?'
  const issue = {
    id, title, created, due, effort, owner, status, description,
  };
  db.issues.insertOne(issue);
}

const count = db.issues.count();
db.counters.update({ _id: 'issues' }, { $set: { current: count } });

print(`Issues in DB: ${count} issues`);
