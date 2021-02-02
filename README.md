# Answer and Question

A Jeopardy! Style Game

See `sample_game.json` for an example game and an embedded tutorial.

## How to Create a Game

1. Create a `.json` file to hold game data.
2. Add your data as properly formatted JSON. You can include as many categories and clues within each category as you want. Categories need not have clues with the same point value nor the same number of clues per category.

```json
{
    "title": "Game Title",
    "author": "Game Author",
    "description": "A description of the game.",
    "categories": [
        {
            "category": "Title of Category",
            "clues": [
                {
                    "points": 200,
                    "answer": "This is what is displayed first.",
                    "question": "This is what is displayed second."
                },
                ...
            ]
        },
        ...
    ]
}
```

## How to play the game

1. Place `index.html`, `index.js`, and `style.css` on your web server, or load the [version hosted on GitHub Pages](https://brandoningli.github.io/answer-and-question).
2. Click `Pick Game` and select the `.json` file you created earlier. All processing is done client-side, so the file is not sent to any server.
3. Set up teams for scoring.
    1. Use the Add/Remove buttons on the lower left to add and remove team scoreboards.
    2. Click on the Team Name to change it.
4. Click on a clue to reveal it.
5. Click anywhere on the clue to reveal the question.
6. Click the Close button to close the clue and mark it as viewed. This also updates the "Last Question" score.
    1. To close the clue without marking it as viewed, use the X button at the upper right of the clue at any time.
7. Use the +/- buttons next to a team to add or remove the number of points of the last viewed clue. If needed, click on any score to manually set it.

## Important Notes

+ Scores and Game Progress **DO NOT SAVE** between sessions.
+ Game files are processed client-side. They are not sent to any server.