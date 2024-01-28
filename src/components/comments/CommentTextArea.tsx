import { Button } from "@components/ui/button/button";

function CommentTextArea() {
  return (
    <div className="w-full">
      <label htmlFor="comments-about-climb" className="sr-only">
        Climb Comments
      </label>

      <div className="overflow-hidden">
        <textarea
          id="climb-comments"
          className="w-full p-2 align-top border-t-0 rounded-md resize-none border-text-color/20 border-x-0 sm:text-sm"
          rows={4}
          placeholder="What do you think about this climb?"
        ></textarea>

        <div className="flex items-center justify-end py-3">
          <Button className="justify-self-end">Add</Button>
        </div>
      </div>
    </div>
  );
}

export default CommentTextArea;
