import React from "react";
import "./About_us.css";
import { useTranslation } from "react-i18next";
function AboutUs() {
  const { t } = useTranslation();

  return (
    <div className="about-us-container">
        <nav className="breadcrumbs-nav">
                    <Link to="/Home" className="Breadcrumbs">
                        {t("setting.home", "Home")}
                    </Link>
                    {pathname.map((value, index) => {
                        const to = "/" + pathname.slice(0, index + 1).join("/");
                        const isLast = index === pathname.length - 1;
                        const translationKey = value.toLowerCase().replace("%20", "_").replace(" ", "_");

                        return (
                            <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="breadcrumb-separator">
                                    {t("setting.breadcrumb_separator", ">")}
                                </span>
                                {isLast ? (
                                    <span className="current-page" style={{ textDecoration: 'none' }}>
                                        {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                    </span>
                                ) : (
                                    <Link to={to} className="Breadcrumbs">
                                        {t(`setting.${translationKey}`, decodeURIComponent(value).replace("_", " "))}
                                    </Link>
                                )}
                            </span>
                        );
                    })}
                </nav>
      <h1>{t("about_us.title")}</h1>
      <p>{t("about_us.text")}</p>
    </div>
  );
}
export default AboutUs;