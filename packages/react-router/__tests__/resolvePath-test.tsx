import { resolvePath } from "react-router";

describe("resolvePath", () => {
  it('resolves absolute paths irrespective of the "from" pathname', () => {
    expect(resolvePath("/search", "/inbox")).toMatchObject({
      pathname: "/search",
    });
  });

  it("resolves relative paths", () => {
    expect(resolvePath("../search", "/inbox")).toMatchObject({
      pathname: "/search",
    });

    expect(resolvePath("./search", "/inbox")).toMatchObject({
      pathname: "/inbox/search",
    });

    expect(resolvePath("./search/../123", "/inbox")).toMatchObject({
      pathname: "/inbox/123",
    });

    expect(resolvePath("search", "/inbox")).toMatchObject({
      pathname: "/inbox/search",
    });
  });

  it("normalizes mixed leading separators", () => {
    expect(resolvePath("//foo")).toMatchObject({
      pathname: "/foo",
    });

    expect(resolvePath("\\\\foo")).toMatchObject({
      pathname: "/foo",
    });

    expect(resolvePath("/\\foo")).toMatchObject({
      pathname: "/foo",
    });

    expect(resolvePath("\\/foo")).toMatchObject({
      pathname: "/foo",
    });
  });

  it("does not produce protocol-relative pathnames from mixed separators", () => {
    expect(resolvePath("\\\\google.com/path?q=query#hash")).toEqual({
      pathname: "/google.com/path",
      search: "?q=query",
      hash: "#hash",
    });

    expect(resolvePath("/\\google.com", "/inbox")).toMatchObject({
      pathname: "/google.com",
    });

    expect(resolvePath("\\/google.com", "/inbox")).toMatchObject({
      pathname: "/google.com",
    });

    expect(resolvePath("\\\\google.com", "/inbox")).toMatchObject({
      pathname: "/google.com",
    });

    expect(resolvePath({ pathname: "/\\google.com" })).toMatchObject({
      pathname: "/google.com",
    });

    expect(resolvePath("search/../..\\/google.com", "/inbox")).toMatchObject({
      pathname: "/google.com",
    });

    expect(resolvePath("../\\google.com", "/inbox")).toMatchObject({
      pathname: "/google.com",
    });

    expect(resolvePath("\\google.com", "/")).toMatchObject({
      pathname: "/google.com",
    });
  });

  it('ignores trailing slashes on the "from" pathname when resolving relative paths', () => {
    expect(resolvePath("../search", "/inbox/")).toMatchObject({
      pathname: "/search",
    });
  });

  it('uses the "from" pathname when the "to" value has no pathname', () => {
    expect(resolvePath("?q=react", "/search")).toMatchObject({
      pathname: "/search",
      search: "?q=react",
    });
  });

  it("normalizes search and hash values", () => {
    expect(
      resolvePath({ pathname: "/search", search: "q=react", hash: "results" })
    ).toEqual({
      pathname: "/search",
      search: "?q=react",
      hash: "#results",
    });
  });
});
