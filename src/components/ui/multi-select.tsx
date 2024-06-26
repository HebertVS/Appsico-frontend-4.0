import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, WandSparkles, XCircle, XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/libraries/utils';
import { Checkbox } from './checkbox';

const multiSelectVariants = cva('m-1', {
  variants: {
    variant: {
      default:
        'border-foreground/10 drop-shadow-md text-foreground bg-card hover:bg-card/80',
      secondary:
        'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive:
        'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  asChild?: boolean;
  options?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  defaultValue?: string[];
  disabled?: boolean;
  placeholder: string;
  className?: string;
  animation?: number;
  onValueChange: (value: string[]) => void;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      className,
      variant,
      asChild = false,
      options = [],
      defaultValue,
      onValueChange,
      disabled,
      placeholder,
      animation = 0,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(
      defaultValue || []
    );
    const selectedValuesSet = React.useRef(new Set(selectedValues));
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(animation > 0);

    React.useEffect(() => {
      setSelectedValues(defaultValue || []);
      selectedValuesSet.current = new Set(defaultValue);
    }, [defaultValue]);

    const handleInputKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.target.value) {
        selectedValues.pop();
        setSelectedValues([...selectedValues]);
        selectedValuesSet.current.delete(
          selectedValues[selectedValues.length - 1]
        );
        onValueChange([...selectedValues]);
      }
    };

    const toggleOption = (value: string) => {
      if (selectedValuesSet.current.has(value)) {
        selectedValuesSet.current.delete(value);
        setSelectedValues(selectedValues.filter((v) => v !== value));
      } else {
        selectedValuesSet.current.add(value);
        setSelectedValues([...selectedValues, value]);
      }
      onValueChange(Array.from(selectedValuesSet.current));
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={true}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className='flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-card'
          >
            {selectedValues.length > 0 ? (
              <div className='flex justify-between items-center w-full'>
                <div className='flex flex-wrap items-center'>
                  {selectedValues.map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          isAnimating ? 'animate-bounce' : '',
                          multiSelectVariants({ variant, className }),
                          'text-xs font-normal rounded-sm !shadow-none drop-shadow-none capitalize'
                        )}
                        style={{
                          animationDuration: `${animation}s`,
                        }}
                      >
                        {IconComponent && (
                          <IconComponent className='h-4 w-4 mr-2' />
                        )}
                        {option?.label}
                        <XCircle
                          className='ml-2 w-3 h-3 cursor-pointer'
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                </div>
                <div className='flex items-center justify-between'>
                  <XIcon
                    className='h-4 mx-2 cursor-pointer text-muted-foreground'
                    onClick={(event) => {
                      setSelectedValues([]);
                      selectedValuesSet.current.clear();
                      onValueChange([]);
                      event.stopPropagation();
                    }}
                  />
                  <Separator
                    orientation='vertical'
                    className='flex min-h-6 h-full'
                  />
                  <ChevronDown className='h-4 mx-2 cursor-pointer text-muted-foreground' />
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-between w-full mx-auto'>
                <span className='text-sm text-muted-foreground font-normal mx-2'>
                  {placeholder}
                </span>
                <ChevronDown className='h-4 cursor-pointer text-muted-foreground mx-2' />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[300px] p-0 drop-shadow-sm'
          align='start'
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder='Pesquisar...'
              onKeyDown={handleInputKeyDown}
            />
            <CommandList className='max-h-60'>
              <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => {
                  const isSelected = selectedValuesSet.current.has(
                    option.value
                  );
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      style={{
                        pointerEvents: 'auto',
                        opacity: 1,
                      }}
                      className='cursor-pointer'
                    >
                      <Checkbox checked={isSelected} className='mr-2' />
                      {option.icon && (
                        <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                      )}
                      <span className='capitalize'>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandGroup>
              <div className='flex items-center justify-between'>
                {selectedValues.length > 0 && (
                  <>
                    <CommandItem
                      onSelect={() => {
                        setSelectedValues([]);
                        selectedValuesSet.current.clear();
                        onValueChange([]);
                      }}
                      style={{
                        pointerEvents: 'auto',
                        opacity: 1,
                      }}
                      className='flex-1 justify-center cursor-pointer'
                    >
                      Limpar
                    </CommandItem>
                    <Separator
                      orientation='vertical'
                      className='flex min-h-6 h-full'
                    />
                  </>
                )}
                <CommandSeparator />
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  style={{
                    pointerEvents: 'auto',
                    opacity: 1,
                  }}
                  className='flex-1 justify-center cursor-pointer'
                >
                  Fechar
                </CommandItem>
              </div>
            </CommandGroup>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              'cursor-pointer my-2 text-foreground bg-background w-3 h-3',
              isAnimating ? '' : 'text-muted-foreground'
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
