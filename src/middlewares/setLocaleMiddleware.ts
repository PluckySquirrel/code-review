import { Request, Response, NextFunction } from "express";

interface CustomResponse extends Response {
    setLocale: (locale: string) => void;
}

const setLocaleMiddleware = (
    req: Request,
    res: CustomResponse,
    next: NextFunction
) => {
    const lng = typeof req.query.lng === "string" ? req.query.lng : "en";

    res.setLocale = (locale: string) => {
        req.i18n.changeLanguage(locale);
    };

    res.setLocale(lng);
    next();
};

export default setLocaleMiddleware;
