import { Router, Request, Response } from "express";
import signatureService from "../service/signature.service";

const router = Router();
router.get("/", async (req: Request, res: Response) => {
  const { projectId, buyerPub, amount, price } = req.query;
  if (
    typeof projectId === "string" &&
    typeof buyerPub === "string" &&
    typeof amount === "string"
    // &&typeof price === "string"
  ) {
    const signature = await signatureService.getSignature(
      projectId,
      buyerPub,
      amount
      // price
    );
    if (typeof signature != "string") {
      res.status(200).send(signature);
      return;
    } else res.status(500).send(signature);
  }
  res.status(400).send("Invalid query param");
});

export { router as signRouter };
