function init() {
  const zen = new Zen();
  const contentLoader = new ContentLoader(zen);
  const listener = new ScrollListener(50);

  listener.addCallback(contentLoader.checkEdge.bind(contentLoader));
}

init();
