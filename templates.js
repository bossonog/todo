const rootTemplate = `<div class="wrapper">
  <header class="header">
    <div class="container">
      <h1 class="app-title title">todos</h1>
    </div>
  </header>
  <main class="main">
    <section class="section todoapp">
      <div class="container">
        <div class="app">
        </div>
      </div>
    </section>
  </main>
  </div>`;

const _filtersTemplate = `
  <div class="app-controls">
  <span class="app-todos-count">0 items left</span>
    <div class="app-filters">
      <button class="app-all-btn button">All</button>
      <button class="app-active-btn button">Active</button>
      <button class="app-completed-btn button">Completed</button>
    </div>
  </div>`;

const filtersTemplate = `
    <div class="app-filters">
      <button class="app-all-btn button">All</button>
      <button class="app-active-btn button">Active</button>
      <button class="app-completed-btn button">Completed</button>
    </div>`;