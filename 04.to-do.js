/* 메모리 저장소 */
let todos = [];
let nextId = 1;

/* 현재 스와이프로 열린 항목 (모바일) */
let swipedItem = null;

function initApp() {
  const input = document.querySelector('.todo-input');
  const addBtn = document.querySelector('.add-btn');

  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
  });

  /* 목록 바깥 터치 시 열린 스와이프 닫기 */
  document.addEventListener('touchstart', (e) => {
    if (swipedItem && !swipedItem.contains(e.target)) {
      closeSwipe(swipedItem);
    }
  }, { passive: true });

  renderList();
}

/* ── 할 일 추가 ── */
function addTodo() {
  const input = document.querySelector('.todo-input');
  const text = input.value.trim();

  if (!text) {
    alert('할 일을 입력하세요');
    input.focus();
    return;
  }

  todos.push({ id: nextId++, text, completed: false });
  input.value = '';
  input.focus();
  renderList();
}

/* ── 완료 토글 ── */
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
  renderList();
}

/* ── 항목 삭제 ── */
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderList();
}

/* ── 목록 렌더링 ── */
function renderList() {
  const list = document.querySelector('.todo-list');
  const emptyMsg = document.querySelector('.empty-msg');

  swipedItem = null;
  emptyMsg.style.display = todos.length === 0 ? 'block' : 'none';

  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.dataset.id = todo.id;

    /* XSS 방지: 구조는 innerHTML, 사용자 텍스트는 textContent */
    li.innerHTML = `
      <div class="item-track">
        <div class="item-inner">
          <input type="checkbox" class="todo-check" ${todo.completed ? 'checked' : ''}>
          <span class="todo-text"></span>
          <button class="delete-btn" aria-label="삭제">✕</button>
        </div>
        <button class="swipe-delete-btn" aria-label="삭제">삭제</button>
      </div>
    `;
    li.querySelector('.todo-text').textContent = todo.text;

    li.querySelector('.item-inner').addEventListener('click', (e) => {
      if (!e.target.closest('.delete-btn')) toggleTodo(todo.id);
    });
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));
    li.querySelector('.swipe-delete-btn').addEventListener('click', () => deleteTodo(todo.id));

    attachSwipe(li);
    list.appendChild(li);
  });
}

/* ── 모바일 스와이프-투-삭제 ── */
function attachSwipe(li) {
  const track = li.querySelector('.item-track');
  const REVEAL_WIDTH = 72; /* swipe-delete-btn 너비와 동일 */
  const SNAP_THRESHOLD = 40;

  let startX = 0, startY = 0;
  let isHorizontal = false;

  li.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isHorizontal = false;

    /* 다른 열린 항목 닫기 */
    if (swipedItem && swipedItem !== li) {
      closeSwipe(swipedItem);
    }
  }, { passive: true });

  li.addEventListener('touchmove', (e) => {
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;

    if (!isHorizontal && Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5) return;
    if (!isHorizontal && Math.abs(deltaY) >= Math.abs(deltaX)) return;

    isHorizontal = true;
    e.preventDefault(); /* 세로 스크롤 방지 */

    if (deltaX < 0) {
      const clamped = Math.max(deltaX, -REVEAL_WIDTH);
      track.style.transition = 'none';
      track.style.transform = `translateX(${clamped}px)`;
    }
  }, { passive: false });

  li.addEventListener('touchend', (e) => {
    if (!isHorizontal) return;
    isHorizontal = false;

    const deltaX = e.changedTouches[0].clientX - startX;
    track.style.transition = '';

    if (deltaX < -SNAP_THRESHOLD) {
      track.style.transform = `translateX(-${REVEAL_WIDTH}px)`;
      li.classList.add('swiped');
      swipedItem = li;
    } else {
      closeSwipe(li);
    }
  });
}

function closeSwipe(li) {
  const track = li.querySelector('.item-track');
  if (track) track.style.transform = '';
  li.classList.remove('swiped');
  if (swipedItem === li) swipedItem = null;
}

initApp();
