import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "@/components/icons/icons";
import { IoAddOutline } from "react-icons/io5";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import TextArea
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const schema = z.object({
  deliverable: z.string().min(2).max(50),
  price: z.number().optional(),
  description: z.string().optional(),
});

export function PriceDialogDemo() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      deliverable: "",
      price: undefined,
      description: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data); // Handle form submission here
    document.getElementById("closeDialog")?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">
          <IoAddOutline className="mr-2 w-5 h-5" /> Добавить прайс
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить прайс</DialogTitle>
          <DialogDescription>
            Введите данные ниже, и мы отобразим их на вашей странице с платежной
            ссылкой.
          </DialogDescription>
        </DialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-5">
              {/* Username field */}
              <FormField
                control={form.control}
                name="deliverable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название</FormLabel>
                    <FormControl>
                      <Input placeholder={"Добавьте название"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display Name field */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена (необязательное поле)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={"Добавьте цену"}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bio field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание (необязательное поле)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={"Добавьте описание"}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {/* <Button type="submit">Submit</Button> */}
                <DialogFooter>
                  {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Отмена
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Добавить
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
