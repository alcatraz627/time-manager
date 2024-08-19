# Time Manager

## Notion-like editor
Basic Notion editor with [novel.sh](https://www.npmjs.com/package/novel)

- [ ] Use novel.sh
- [ ] Move to separate package

#### Basic
- [ ] Rich Text Formatting inside line
- [ ] Each line can have its type
- [ ] Support indentation
- [ ] All lines same size

#### Interactivity
- [ ] Up / Down arrow anchoring
- [ ] Allow Dragging lines to reorder
- [ ] Show line context menu on right click

#### Extended media
  - [ ] Support images
  - [ ] Support urls
  - [ ] Support todos

#### Plugins
  - [ ] Allow adding consumer specific plugins for custom line content

Each editor instance will bidirectionally consume and modify a `Content` instance
> `Content` = `Line[]`
> `Line` = `Text | Link | Embed` 
- `Text` - Single-line Markdown text
  - content: string
- `Embed` - Image, URL Preview, Document, Video, etc
  - value: string
  - type: image | url | video | ...
  - mode: (type specific mode)
- `Link` - Links to another primitive (see below)
  - id: (id)
  - type: (primitive type)

## Time Manager Primitives
> [To Be Added](https://www.notion.so/alcatraz627/63450b5ccdf44766a096c217af12ac93?v=4d0f46cc47b7446fbea79aed05cc1faa&p=4e6c64658eb24dbe9ef8cce2946bc541&pm=s)

#### Element
  - Task
#### Container
  - Board
  - Note
#### Dynamic
- Goal
- Schedule
#### Data
- User

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### First Time Installation

```bash
nvm use
npm install

# install vercel cli
npm install -g vercel
# pull env config
vercel pull
```

### Start Server

```bash
nvm use
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Deploy on Vercel

```bash
npm install -g vercel
vercel
```

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
