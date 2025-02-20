"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom"

// import { addProduct, updateProduct } from "../../_actions/products"
// import { Product } from "@prisma/client"
// import Image from "next/image"




const ProductForm = () => {
  const [error, action] = useFormState(addProduct,{})
  const [priceInCents, setPriceInCents] = useState();

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Description</Label>
        <Textarea id="description" name="description" required />
        {error.description && <div className="text-destructive">{error.description}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="name">File</Label>
        <Input type="file" id="file" name="file" required />
        {error.file && <div className="text-destructive">{error.file}</div>}

      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Image</Label>
        <Input type="file" id="image" name="image" required />
        {error.image && <div className="text-destructive">{error.image}</div>}

      </div>
      <SubmitBtn/>
    </form>
  );
};

export default ProductForm;

function SubmitBtn() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{pending ? 'Saving...': 'Save'}</Button>;
}
