import * as z from "zod";
import { PredicateStatement as _PredicateStatement, StatementValidator } from "../../utilities/modules/predication.ts";

export const PredicateStatement = z.custom<_PredicateStatement>((data) => StatementValidator.isStatement(data));
