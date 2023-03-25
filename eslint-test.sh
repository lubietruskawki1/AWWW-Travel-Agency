#/bin/sh
echo "Pending";
RET_VAL=0;
for f in $(find . -name '*.mjs' -or -name '*.js');
do
    npx eslint $f;
    ((RET_VAL|=$?));
done;
if [ $RET_VAL -eq 0 ] 
    then touch .js_ok
    else rm .js_ok
fi;
echo "Done";