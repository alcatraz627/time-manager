export const getCursorOffset = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const offset = range?.endOffset || 0;

    return offset;
};

export const setCursorPosition = (
    editableElem: HTMLElement,
    position: number
) => {
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(editableElem.childNodes[0], position);
    range.collapse(true);

    sel?.removeAllRanges();
    sel?.addRange(range);
    editableElem.focus();
};
