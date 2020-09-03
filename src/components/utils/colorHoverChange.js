export const colorHoverChange = (buttonClass, type) => {
  if (type === "landing") {
    if (buttonClass === "btn-primary btn-landing")
      return "btn-primary-1 btn-landing";
    else if (buttonClass === "btn-primary-1 btn-landing")
      return "btn-primary-2 btn-landing";
    else if (buttonClass === "btn-primary-2 btn-landing")
      return "btn-primary-3 btn-landing";
    else if (buttonClass === "btn-primary-3 btn-landing")
      return "btn-primary btn-landing";
  }
  if (type === "loginButton") {
    if (buttonClass === "btn-primary") return "btn-primary-1";
    else if (buttonClass === "btn-primary-1") return "btn-primary-2";
    else if (buttonClass === "btn-primary-2") return "btn-primary-3";
    else if (buttonClass === "btn-primary-3") return "btn-primary";
  }
  if (type === "logo") {
    if (buttonClass === "nav-logo") return "nav-logo-1";
    else if (buttonClass === "nav-logo-1") return "nav-logo-2";
    else if (buttonClass === "nav-logo-2") return "nav-logo-3";
    else if (buttonClass === "nav-logo-3") return "nav-logo";
  }
};

export const arrowColorchange = (buttonClass, type) => {
  if (type === "#06d6a0") {
    if (buttonClass === "#06d6a0") return "#ff6459";
    else if (buttonClass === "down-arrow-1") return "down-arrow-2";
    else if (buttonClass === "down-arrow-2") return "down-arrow-3";
    else if (buttonClass === "down-arrow-3") return "down-arrow";
  }
};

// export { colorHoverChange };
