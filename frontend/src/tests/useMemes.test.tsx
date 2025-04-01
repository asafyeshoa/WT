import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useMemes } from "@/hooks/useMemes";
import * as memeApi from "@/services/memeApi";
import { Meme } from "@/types/memes.types";

const mockMemes: Meme[] = [
  {
    _id: "1",
    name: "Mock Meme 1",
    url: "https://example.com/1.jpg",
  },
  {
    _id: "2",
    name: "Mock Meme 2",
    url: "https://example.com/2.jpg",
  },
];

jest.mock("@/services/memeApi");

describe("useMemes", () => {
  it("fetches memes and updates state", async () => {
    (memeApi.getMemes as jest.Mock).mockResolvedValue({
      data: mockMemes,
      page: 1,
      limit: 10,
      total: 2,
      totalPages: 1,
    });

    const { result } = renderHook(() => useMemes());

    // wait for next tick to resolve promise
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.memes.length).toBe(2);
    expect(result.current.memes[0].name).toBe("Mock Meme 1");
  });
});
