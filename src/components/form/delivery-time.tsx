import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format, addDays } from "date-fns";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface DeliveryTimeFieldProps {
  form: UseFormReturn<FieldValues & { deliveryTime: "priority" | "normal" }>;
}

export function DeliveryTimeField({ form }: DeliveryTimeFieldProps) {
  const tomorrow = addDays(new Date(), 1);
  const nextWeek = addDays(new Date(), 7);

  return (
    <FormField
      name="deliveryTime"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Delivery Time</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-4"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="priority" />
                </FormControl>
                <FormLabel className="font-normal">
                  Priority Delivery - {format(tomorrow, "MMM d, yyyy")}
                  <span className="ml-2 text-muted-foreground">($50)</span>
                </FormLabel>
              </FormItem>

              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="normal" />
                </FormControl>
                <FormLabel className="font-normal">
                  Normal Delivery - Around {format(nextWeek, "MMM d, yyyy")}
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
