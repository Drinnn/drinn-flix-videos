import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import UniqueEntityId from "../../../@seedwork/domain/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("category constructor", () => {
    let category = new Category({
      name: "Movie",
    });
    let props = omit(category.props, "createdAt");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      isActive: true,
    });
    expect(category.props.createdAt).toBeInstanceOf(Date);

    let createdAt = new Date();
    category = new Category({
      name: "Movie",
      description: "Some description",
      isActive: false,
      createdAt,
    });
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Some description",
      isActive: false,
      createdAt,
    });

    category = new Category({
      name: "Movie",
      description: "Other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other description",
    });

    category = new Category({
      name: "Movie",
      isActive: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      isActive: true,
    });

    createdAt = new Date();
    category = new Category({
      name: "Movie",
      createdAt,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      createdAt,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];
    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });

    const id = new UniqueEntityId("4dfacbef-46ea-49f7-8ac1-6420b1cd69bc");
    const category = new Category({ name: "Movie" }, id);
    expect(category.id).not.toBeNull();
    expect(category.id).toBeInstanceOf(UniqueEntityId);
    expect(category.id).toEqual({
      id: "4dfacbef-46ea-49f7-8ac1-6420b1cd69bc",
    });
  });

  test("name prop getter", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("description prop getter and setter", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie", description: "Some description" });
    expect(category.description).toBe("Some description");

    category = new Category({ name: "Movie" });

    category["description"] = "Edited description";
    expect(category.description).toBe("Edited description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("isActive prop getter and setter", () => {
    let category = new Category({ name: "Movie" });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie", isActive: true });
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie", isActive: false });
    expect(category.isActive).toBeFalsy();

    category = new Category({ name: "Movie", isActive: false });

    category["isActive"] = true;
    expect(category.isActive).toBeTruthy();

    category = new Category({ name: "Movie" });

    category["isActive"] = false;
    expect(category.isActive).toBeFalsy();

    category["isActive"] = null;
    expect(category.isActive).toBeFalsy();

    category["isActive"] = undefined;
    expect(category.isActive).toBeFalsy();
  });

  test("createdAt prop getter", () => {
    let category = new Category({ name: "Movie" });
    expect(category.createdAt).toBeInstanceOf(Date);

    const now = new Date();
    category = new Category({ name: "Movie", createdAt: now });
    expect(category.createdAt).toBe(now);
  });
});
