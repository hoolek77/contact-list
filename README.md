# TODO

Please do not fork the repo, clone it and put it in your own github / save it locally.

Definition of done:

1. Fetch contacts using `apiData` function. Contacts are paginated (10 items in batch).
2. "Load more" button is positioned at the bottom of the list. It fetches next batch and appends it to the existing list.
3. Loading state is handled, display some kind of spinner / loader.
4. Error state is handled. It allows to refetch failed batch.
5. Each contact information card is selectable.
6. Selected contacts have outline around them.
7. Selected card can be deselected.
8. Selected contacts are displayed at the top of the list.
9. List performance is optimized when selecting/deselecting/scrolling cards.

Doing this task in typescript is preferred. However, if you do not feel comfortable with typescript, please change file extension to js.

Decide by yourself if you want to install additional dependencies, or code some functionality manually.
Design choices are yours, but please stick to provided layout pattern. Please have UX in mind when making decisions.

![layout.png](layout.png)

Optional: Add functional / unit tests with testing library of your choice.

Good luck and do not hesitate to ask in case of any questions!

---

## Getting Started

To get started with this project, you'll need to have Node.js and yarn installed on your local machine. Then, follow these steps:

```bash
# clone repository
yarn install
yarn dev
```
