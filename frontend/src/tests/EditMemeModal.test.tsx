import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditMemeModal from "@/components/EditMemeModal";
import { Meme } from "@/types/memes.types";

const mockMeme: Meme = {
  _id: "1",
  name: "Original Meme",
  url: "https://example.com/meme.jpg",
};

describe("EditMemeModal", () => {
  it("renders with initial meme data", () => {
    render(
      <EditMemeModal meme={mockMeme} onClose={jest.fn()} onSave={jest.fn()} />
    );

    expect(screen.getByDisplayValue(/Original Meme/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    const onClose = jest.fn();

    render(
      <EditMemeModal meme={mockMeme} onClose={onClose} onSave={jest.fn()} />
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onSave with updated name when Save is clicked", () => {
    const onSave = jest.fn();

    render(
      <EditMemeModal meme={mockMeme} onClose={jest.fn()} onSave={onSave} />
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Updated Meme" } });
    fireEvent.click(screen.getByText(/Save/i));

    expect(onSave).toHaveBeenCalledWith({ name: "Updated Meme" });
  });
});
