import { Utilities } from "#foundry-pf2e/utilities";
import * as z from "zod";

export const PredicateStatement = z.custom<Utilities.Predication.PredicateStatement>((data) =>
    Utilities.Predication.StatementValidator.isStatement(data),
);
