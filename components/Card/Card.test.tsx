import { render } from "@testing-library/react";
import moment from "moment";
import Badge from "../Badge/Badge";
import Card from "./Card";

describe("Display content title in card", () => {
  it("Should matched text content is 'this is a title in card'", () => {
    const { getByText } = render(<Card title="this is a title in card" />);

    const element: HTMLDivElement = getByText(/this is a title in card/i) as any;

    // expect().toContain(`<h2 class=''>this is a title in card</h2>`);
    expect(element.className).toContain("text-2xl font-semibold mb-2 cursor-pointer");
    expect(element.textContent).toEqual("this is a title in card");
  });
});

describe("Display content description in card", () => {
  it("Should matched text content desc is 'This is a description in card'", () => {
    const { getByText } = render(<Card description="This is a description in card" />);

    const element: HTMLDivElement = getByText(/This is a description in card/i) as any;

    // expect().toContain(`<h2 class=''>This is a description in card</h2>`);
    // expect(element.className).toContain("text-2xl font-semibold mb-2 cursor-pointer");
    expect(element.textContent).toEqual("This is a description in card");
    expect(element.parentElement?.nodeName).toContain("P");
    expect(element.nodeName).toContain("SPAN");
  });
});

describe("Display content counting visitor in card", () => {
  it("Should default '0 lượt xem' on component when not assign props value", () => {
    const { getByTestId } = render(<Card />);

    const element: HTMLDivElement = getByTestId("count-viewer-test") as any;

    expect(element.textContent).toContain("0 lượt xem");
    expect(element.className).toContain("text-sm text-slate-400 mb-2 inline-block");
    expect(element.nodeName).toContain("SPAN");
  });

  it("Should '14 lượt xem' on component when assign the value is 14 for countViewer", () => {
    const { getByTestId } = render(<Card countViewer={14} />);

    const element: HTMLDivElement = getByTestId("count-viewer-test") as any;

    expect(element.textContent).toContain("14 lượt xem");
    expect(element.className).toContain("text-sm text-slate-400 mb-2 inline-block");
    expect(element.nodeName).toContain("SPAN");
  });
});

describe("Checking assign value slug on props in title and link ", () => {
  it("Should the navigate to /posts/example-post", () => {
    const { getByTestId } = render(<Card slug="example-post" />);

    const title: HTMLDivElement = getByTestId("slug-title-test") as any;
    const link: HTMLDivElement = getByTestId("slug-link-test") as any;

    expect(title.getAttribute("href")).toContain("/posts/example-post");
    expect(link.getAttribute("href")).toContain("/posts/example-post");
  });
});

describe("Check format date and display created date with format (MMM Do YYYY) in card", () => {
  it("Should have text content is 'Feb 14th 2022' for date 14/02/2022", () => {
    const now = moment("14/02/2022", "DD/MM/YYYY");
    const { getByTestId } = render(<Card createdAt={now.toISOString()} />);

    const dateElement: HTMLDivElement = getByTestId("created-at-test") as any;

    // expected follow moment
    expect(dateElement.textContent).toContain(now.format("MMM Do YYYY"));
    // expected text
    expect(dateElement.textContent).toContain("Feb 14th 2022");
  });
});

describe("Display tags list with badge in card", () => {
  it("Should display two tags in card", () => {
    const tagLists = [
      {
        name: "React",
        slug: "react",
        tagId: 1,
        description: "React Example",
        textContent: render(<Badge>React</Badge>).container.firstChild,
      },
      {
        name: "Vue",
        slug: "vue",
        tagId: 2,
        description: "Vue example",
        textContent: render(<Badge>Vue</Badge>).container.firstChild,
      },
    ];

    const { getAllByTestId } = render(<Card tag={tagLists} />);
    render(<Badge></Badge>);

    const tagElements = getAllByTestId("tags-test");

    tagElements.forEach((tag, index) => {
      expect(tag.getAttribute("href")).toBe(`/tags/${tagLists[index].slug}`);
      expect(tag.textContent).toBe(tagLists[index].name);
    });
  });

  it("Should display three tags in card", () => {
    const tagLists = [
      {
        name: "React",
        slug: "react",
        tagId: 1,
        description: "React Example",
        textContent: render(<Badge>React</Badge>).container.firstChild,
      },
      {
        name: "Vue",
        slug: "vue",
        tagId: 2,
        description: "Vue example",
        textContent: render(<Badge>Vue</Badge>).container.firstChild,
      },
      {
        name: "Laravel",
        slug: "laravel",
        tagId: 3,
        description: "laravel example",
        textContent: render(<Badge>Laravel</Badge>).container.firstChild,
      },
    ];

    const { getAllByTestId } = render(<Card tag={tagLists} />);
    render(<Badge></Badge>);

    const tagElements = getAllByTestId("tags-test");

    tagElements.forEach((tag, index) => {
      expect(tag.getAttribute("href")).toBe(`/tags/${tagLists[index].slug}`);
      expect(tag.textContent).toBe(tagLists[index].name);
    });
  });
});
