import { render, screen, fireEvent } from "@testing-library/react";
import MemeCard from "@/components/MemeCard";
import React from "react";

const mockMeme = {
  _id: "123456",
  name: "Funny Cat",
  url: "https://example.com/cat.jpg",
};

describe("MemeCard", () => {
  it("renders meme name and image", () => {
    render(<MemeCard meme={mockMeme} onEdit={jest.fn()} />);

    expect(screen.getByText(/funny cat/i)).toBeInTheDocument();
    expect(screen.getByAltText(/funny cat/i)).toHaveAttribute(
      "src",
      mockMeme.url
    );
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = jest.fn();
    render(<MemeCard meme={mockMeme} onEdit={onEdit} />);

    fireEvent.click(screen.getByText(/edit/i));
    expect(onEdit).toHaveBeenCalledWith(mockMeme);
  });
});
