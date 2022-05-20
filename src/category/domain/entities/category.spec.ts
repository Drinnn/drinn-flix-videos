import { Category, CategoryProperties } from "./category";

describe("Category Unit Tests", () => {
  test("category constructor", () => {
    const now = new Date();
    const category = new Category({
      name: "Movie",
      description: "Some description",
      isActive: true,
      createdAt: now,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some description",
      isActive: true,
      createdAt: now,
    });
  });
});
